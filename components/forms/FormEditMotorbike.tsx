"use client";

import { app } from "@/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { motorbikeShowSchema } from "@/validation/schemas";

export function FormEditMotorbike({ carId }: { carId: string }) {
  return (
    <div>
      <form>
        <Label htmlFor="model">Modelo</Label>
        <Input type="text" />
      </form>
    </div>
  );
}
