import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsPage() {
  const news = [
    { id: 1, title: "Notícia 1", content: "Conteúdo da notícia 1." },
    { id: 2, title: "Notícia 2", content: "Conteúdo da notícia 2." },
    { id: 3, title: "Notícia 3", content: "Conteúdo da notícia 3." },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Últimas Notícias</h1>
      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
