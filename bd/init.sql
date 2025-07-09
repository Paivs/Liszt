-- EXTENSÕES & TYPES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

-- Tabela de usuários (terapeutas e pacientes)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK(role IN ('therapist', 'patient', 'admin')) NOT NULL, -- 'therapist' ou 'patient'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de terapeutas (com dados específicos)
CREATE TABLE therapist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Referência ao usuário (therapist)
    name VARCHAR(255) NOT NULL, -- Nome completo do terapeuta
    cpf VARCHAR(20) UNIQUE, -- CPF (se pessoa física)
    email VARCHAR(255) UNIQUE, -- Email do terapeuta
    phone VARCHAR(20), -- Telefone de contato
    address TEXT, -- Endereço completo
    
    accepts_local BOOLEAN,
    available_days TEXT[], -- ex: ["Seg", "Qua", "Sex"]
    price NUMERIC(10,2),

    profile_picture TEXT, 
    bio TEXT, 
    verified BOOLEAN DEFAULT FALSE, -- Se o terapeuta foi verificado/admin aprovado.
    visibility BOOLEAN DEFAULT TRUE, -- Se o terapeuta está visível na plataforma.
    crp VARCHAR(20),
    specialties TEXT[],
    approach TEXT,
    
    last_login TIMESTAMP, -- Último login na plataforma.
    deactivated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de atualização
    CONSTRAINT therapist_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE admin (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE, -- Referência ao usuário base
    role VARCHAR(50) DEFAULT 'admin', -- Papel do admin (admin, superadmin, etc.)
    email VARCHAR(255) UNIQUE, -- Email de contato
    phone VARCHAR(20), -- Telefone
    last_login TIMESTAMP, -- Último login
    active BOOLEAN DEFAULT TRUE, -- Status de ativação
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT admin_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- Tabela de pacientes (com dados específicos)
CREATE TABLE patient (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Referência ao usuário (paciente)
    name VARCHAR(255) NOT NULL, -- Nome completo do cliente
    cpf VARCHAR(20) UNIQUE, -- CPF (se pessoa física)
    email VARCHAR(255) UNIQUE, -- Email do cliente
    phone VARCHAR(20), -- Telefone de contato
    emergency_contact_name VARCHAR(255), -- Nome do contato de emergência
    emergency_contact_phone VARCHAR(20), -- Telefone do contato de emergência
    address TEXT, -- Endereço completo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de atualização
    CONSTRAINT patient_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Tabela de diário de emoções
CREATE TABLE emotion_journal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient(id) ON DELETE CASCADE, -- Referência ao paciente
    date TIMESTAMP NOT NULL,
    mood VARCHAR(50),  -- Emoção registrada (ex: feliz, triste, ansioso)
    intensity int, -- de 0 a 10
    emotion_trigger VARCHAR(255),
    description TEXT,  -- Descrição adicional sobre o que aconteceu
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de diário de sonhos
CREATE TABLE dream_journal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient(id) ON DELETE CASCADE, -- Referência ao paciente
    date TIMESTAMP NOT NULL,
    category VARCHAR(100), -- pesadelo, lucido, recorrente, profético, comum, simbólico
    clarity VARCHAR(100), -- muito vago, vago, moderado, claro, muito claro
    title VARCHAR(255),
    dream_description TEXT,  -- Descrição do sonho
    emotions_list TEXT, 
    symbols_list TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Appointment (agendamento de sessões de terapia)
CREATE TABLE appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    therapist_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Terapeuta responsável pela sessão
    patient_id UUID REFERENCES patient(id) ON DELETE CASCADE,    -- Paciente que será atendido
    scheduled_time TIMESTAMP NOT NULL,  -- Data e hora agendada para a sessão
    type_appointment VARCHAR(100), -- individual, casal, familiar, avaliação
    status_appointment varchar(100), -- pendente, aprovada, reprovada, concluída
    obs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar as consultas
CREATE INDEX idx_sessions_patient_id ON sessions(patient_id);
CREATE INDEX idx_emotion_journal_patient_id ON emotion_journal(patient_id);
CREATE INDEX idx_dream_journal_patient_id ON dream_journal(patient_id);

-- logs
CREATE TABLE activity_logs (
    id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL,
    action character varying(100) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
