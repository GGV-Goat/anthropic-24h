export type SkillStatus = "vigente" | "en_desuso" | "descontinuado";
export type McpStatus = "vigente" | "en_desuso" | "descontinuado";
export type CliStatus = "vigente" | "en_desuso" | "descontinuado";

export interface Skill {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  popularidad: string | null;
  estado: SkillStatus;
  fecha_creacion: string;
  activo: boolean;
}

export interface McpServer {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: McpStatus;
  reemplazado_por: string | null;
  fecha_inicio_desuso: string | null;
  ampliamente_usado: boolean;
  activo: boolean;
  fecha_actualizacion: string;
}

export interface Cli {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  estado: CliStatus;
  activo: boolean;
  fecha_actualizacion: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  url_fuente: string;
  fuente: string;
  categoria: "claude" | "code" | "design" | "anthropic" | "cowork";
  fecha_publicacion: string;
  fecha_expiracion: string;
}

export type Database = {
  public: {
    Tables: {
      skills: {
        Row: Skill;
        Insert: Omit<Skill, "id"> & { id?: string };
        Update: Partial<Skill>;
        Relationships: [];
      };
      mcp_servers: {
        Row: McpServer;
        Insert: Omit<McpServer, "id"> & { id?: string };
        Update: Partial<McpServer>;
        Relationships: [];
      };
      clis: {
        Row: Cli;
        Insert: Omit<Cli, "id"> & { id?: string };
        Update: Partial<Cli>;
        Relationships: [];
      };
      noticias: {
        Row: Noticia;
        Insert: Omit<Noticia, "id"> & { id?: string };
        Update: Partial<Noticia>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
