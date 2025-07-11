"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Moon,
  Plus,
  Trash2,
  TrendingUp,
  Star,
  Cloud,
  BookHeart,
} from "lucide-react";
import { toast } from "sonner";
import Emotions from "./emotions";
import Dreams from "./dreams";

const Diarios = () => {
  const [activeTab, setActiveTab] = useState("emocoes");

  return (
    <div className="min-h-screen pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
            <BookHeart className="mr-3 h-10 w-10" /> Diários
          </h1>
          <p className="text-white/80 text-lg">
            Registre suas emoções e sonhos em um só lugar.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 glass-effect border-white/20 p-1">
            <TabsTrigger
              value="emocoes"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Heart className="mr-2 h-5 w-5" /> Diário de Emoções
            </TabsTrigger>
            <TabsTrigger
              value="sonhos"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              <Moon className="mr-2 h-5 w-5" /> Diário de Sonhos
            </TabsTrigger>
          </TabsList>

          <Emotions/>

          <Dreams />
        </Tabs>
      </div>
    </div>
  );
};

export default Diarios;