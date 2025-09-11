// src/components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { contactSchema, ContactFormValues } from "@/lib/schemas/contact";
import {
  buildEmailBody,
  buildEmailSubject,
  buildMailtoUrl,
  buildWhatsAppUrl,
  ContactPayload,
} from "@/lib/contact";

// Se usar shadcn/ui:
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""; // ex: 5535999999999

const MAILTO_MAX_SAFE_LEN = 1800; // limite conservador para URL

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    plan: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [info, setInfo] = useState<string>("");

  function update<K extends keyof ContactFormValues>(
    key: K,
    val: ContactFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setInfo("");

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const path = i.path[0]?.toString() ?? "form";
        fieldErrors[path] = i.message;
      });
      setErrors(fieldErrors);
      setStatus("error");
      setInfo("Confira os campos destacados.");
      return;
    }

    const payload: ContactPayload = parsed.data;
    const subject = buildEmailSubject(payload);
    const body = buildEmailBody(payload);

    if (!CONTACT_EMAIL) {
      setStatus("error");
      setInfo("Contato indisponível. Configure NEXT_PUBLIC_CONTACT_EMAIL.");
      return;
    }

    // Tenta mailto
    const mailto = buildMailtoUrl(CONTACT_EMAIL, subject, body);
    if (mailto.length <= MAILTO_MAX_SAFE_LEN) {
      try {
        window.location.href = mailto;
        setStatus("ok");
        setInfo(
          "Abrimos seu cliente de e-mail. Se não abriu, use o botão abaixo."
        );
      } catch {
        // cai no fallback
      }
    } else {
      // mensagem grande: fallback direto
      await fallback(body);
      return;
    }
  }

  async function fallback(body: string) {
    // 1) WhatsApp se disponível
    if (WHATSAPP_NUMBER) {
      const wa = buildWhatsAppUrl(WHATSAPP_NUMBER, body);
      window.open(wa, "_blank", "noopener,noreferrer");
      setStatus("ok");
      setInfo("Abrimos o WhatsApp com a mensagem preenchida.");
      return;
    }
    // 2) Copia p/ área de transferência
    try {
      await navigator.clipboard.writeText(body);
      setStatus("ok");
      setInfo("Copiamos sua mensagem. Cole no seu e-mail e envie para nós.");
    } catch {
      setStatus("error");
      setInfo(
        "Não foi possível criar o contato automaticamente. Copie o texto manualmente."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <div className="space-y-1">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nome*
        </Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      <div className="space-y-1">
        <Label htmlFor="company" className="text-sm font-medium text-gray-700">
          Empresa
        </Label>
        <Input
          id="company"
          value={values.company ?? ""}
          onChange={(e) => update("company", e.target.value)}
          className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail*
          </Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefone (opcional)
          </Label>
          <Input
            id="phone"
            value={values.phone ?? ""}
            onChange={(e) => update("phone", e.target.value)}
            className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            Plano de interesse*
          </Label>
          <Select value={values.plan} onValueChange={(v) => update("plan", v)}>
            <SelectTrigger
              aria-invalid={!!errors.plan}
              className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
            >
              <SelectValue placeholder="Selecione um plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Destaque">Destaque</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          {errors.plan && <p className="text-red-500 text-xs">{errors.plan}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            Orçamento (faixa)
          </Label>
          <Select
            value={values.budget ?? ""}
            onValueChange={(v) => update("budget", v)}
          >
            <SelectTrigger className="border-gray-300 focus:ring-uai.red focus:border-uai.red">
              <SelectValue placeholder="Selecione uma faixa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Até R$ 300/mês">Até R$ 300/mês</SelectItem>
              <SelectItem value="R$ 300–700/mês">R$ 300–700/mês</SelectItem>
              <SelectItem value="R$ 700–1500/mês">R$ 700–1500/mês</SelectItem>
              <SelectItem value="Acima de R$ 1500/mês">
                Acima de R$ 1500/mês
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
          Mensagem*
        </Label>
        <Textarea
          id="message"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          aria-invalid={!!errors.message}
          className="border-gray-300 focus:ring-uai.red focus:border-uai.red"
        />
        {errors.message && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          className="bg-uai.red text-white hover:bg-uai.red/90 focus:ring-2 focus:ring-offset-2 focus:ring-uai.red"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Preparando..." : "Enviar"}
        </Button>

        {CONTACT_EMAIL && (
          <a
            className="text-sm text-uai.red underline hover:opacity-80"
            href={buildMailtoUrl(
              CONTACT_EMAIL,
              buildEmailSubject(values as ContactPayload),
              buildEmailBody(values as ContactPayload)
            )}
            onClick={(e) => {
              const ok = contactSchema.safeParse(values).success;
              if (!ok) e.preventDefault();
            }}
          >
            Ou tentar abrir e-mail manualmente
          </a>
        )}
      </div>

      {info && (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {info}
        </p>
      )}
    </form>
  );
}
