"use client";

import { Button } from "@/components/ui/button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
        Anterior
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>
      <Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
        Próxima
      </Button>
    </div>
  );
}
