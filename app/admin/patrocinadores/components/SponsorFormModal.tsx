"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sponsor,
  createSponsor,
  updateSponsor,
  generateSlug,
  getSponsors,
} from "@/lib/sponsors";
import { ImageUpload } from "./ImageUpload";

interface SponsorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor: Sponsor | null;
}

type FormData = {
  name: string;
  slug: string;
  description: string;
  category: string;
  logoUrl: string;
  galleryImages: string;
  address: string;
  phone: string;
  hours: string;
  href: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
};

const initialFormData: FormData = {
  name: "",
  slug: "",
  description: "",
  category: "",
  logoUrl: "",
  galleryImages: "",
  address: "",
  phone: "",
  hours: "",
  href: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
};

export function SponsorFormModal({
  isOpen,
  onClose,
  sponsor,
}: SponsorFormModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sponsor) {
      setFormData({
        name: sponsor.name,
        slug: sponsor.slug,
        description: sponsor.description,
        category: sponsor.category,
        logoUrl: sponsor.logoUrl,
        galleryImages: sponsor.galleryImages.join("\n"),
        address: sponsor.address,
        phone: sponsor.phone,
        hours: sponsor.hours,
        href: sponsor.href,
        whatsapp: sponsor.whatsapp || "",
        instagram: sponsor.instagram || "",
        facebook: sponsor.facebook || "",
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [sponsor, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && !sponsor ? { slug: generateSlug(value) } : {}),
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug é obrigatório";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Categoria é obrigatória";
    }
    if (!formData.logoUrl.trim()) {
      newErrors.logoUrl = "URL do logo é obrigatória";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Endereço é obrigatório";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const galleryImages = formData.galleryImages
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const sponsorData = {
      slug: formData.slug,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      logoUrl: formData.logoUrl,
      galleryImages,
      address: formData.address,
      phone: formData.phone,
      hours: formData.hours,
      href: formData.href,
      whatsapp: formData.whatsapp || undefined,
      instagram: formData.instagram || undefined,
      facebook: formData.facebook || undefined,
      active: true,
      order: sponsor?.order ?? getSponsors().length,
    };

    if (sponsor) {
      updateSponsor(sponsor.id, sponsorData);
    } else {
      createSponsor(sponsorData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {sponsor ? "Editar Patrocinador" : "Novo Patrocinador"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Nome e Slug */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-neutral-300">
                  Nome *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Nome do patrocinador"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-neutral-300">
                  Slug (URL) *
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="nome-do-patrocinador"
                />
                {errors.slug && (
                  <p className="text-red-400 text-xs">{errors.slug}</p>
                )}
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-neutral-300">
                Categoria *
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-neutral-800 border-neutral-700 text-white"
                placeholder="Ex: Sorveteria, Restaurante, Loja..."
              />
              {errors.category && (
                <p className="text-red-400 text-xs">{errors.category}</p>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-neutral-300">
                Descrição *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="bg-neutral-800 border-neutral-700 text-white resize-none"
                placeholder="Descrição completa do patrocinador..."
              />
              {errors.description && (
                <p className="text-red-400 text-xs">{errors.description}</p>
              )}
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <ImageUpload
                label="Logo *"
                value={formData.logoUrl}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, logoUrl: value }))
                }
              />
              {errors.logoUrl && (
                <p className="text-red-400 text-xs">{errors.logoUrl}</p>
              )}
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <Label htmlFor="galleryImages" className="text-neutral-300">
                Imagens da Galeria (uma URL por linha)
              </Label>
              <Textarea
                id="galleryImages"
                name="galleryImages"
                value={formData.galleryImages}
                onChange={handleChange}
                rows={3}
                className="bg-neutral-800 border-neutral-700 text-white resize-none font-mono text-sm"
                placeholder="/imagem1.jpg&#10;/imagem2.jpg&#10;/imagem3.jpg"
              />
            </div>

            {/* Endereço e Telefone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-neutral-300">
                  Endereço *
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Rua, número, cidade..."
                />
                {errors.address && (
                  <p className="text-red-400 text-xs">{errors.address}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-neutral-300">
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="(35) 3622-0000"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Horário e Site */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hours" className="text-neutral-300">
                  Horário de Funcionamento
                </Label>
                <Input
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Seg-Sex: 9h às 18h"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="href" className="text-neutral-300">
                  Site
                </Label>
                <Input
                  id="href"
                  name="href"
                  value={formData.href}
                  onChange={handleChange}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="https://www.exemplo.com.br"
                />
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="space-y-4">
              <h3 className="text-white font-medium">Redes Sociais</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-neutral-300">
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="5535999999999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-neutral-300">
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-neutral-300">
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white"
            >
              {sponsor ? "Salvar Alterações" : "Criar Patrocinador"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
