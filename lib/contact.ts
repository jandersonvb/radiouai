// src/lib/contact.ts
export type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  plan: string;
  budget?: string;
  message: string;
};

export function sanitizeString(s: string): string {
  // evita injeção de headers no mailto e quebra de layout
  return s.replace(/[\r\n]/g, " ").trim();
}

export function buildEmailSubject(p: ContactPayload): string {
  const base = `Anuncie - ${sanitizeString(p.name)} - ${sanitizeString(
    p.plan
  )}`;
  return base;
}

export function buildEmailBody(p: ContactPayload): string {
  const lines = [
    `Nome: ${sanitizeString(p.name)}`,
    `Empresa: ${sanitizeString(p.company ?? "-")}`,
    `E-mail: ${sanitizeString(p.email)}`,
    `Telefone: ${sanitizeString(p.phone ?? "-")}`,
    `Plano: ${sanitizeString(p.plan)}`,
    `Orçamento: ${sanitizeString(p.budget ?? "-")}`,
    "",
    "Mensagem:",
    sanitizeString(p.message),
    "",
    "— Enviado pelo formulário do site Rádio Uai",
  ];
  return lines.join("\n");
}

export function buildMailtoUrl(
  to: string,
  subject: string,
  body: string
): string {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${to}?subject=${s}&body=${b}`;
}

export function buildWhatsAppUrl(phoneIntl: string, body: string): string {
  // phoneIntl: ex "5535XXXXXXXXX" (DDI+DDD+número, apenas dígitos)
  const text = encodeURIComponent(body);
  return `https://wa.me/${phoneIntl}?text=${text}`;
}
