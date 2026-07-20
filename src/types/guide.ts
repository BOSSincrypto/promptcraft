export type ModelType = 'llms' | 'image-generators' | 'code-models' | 'specialized';
export type ModelSlug = string;

export interface GuideMeta {
  title: string;
  description: string;
  modelType: ModelType;
  modelSlug: ModelSlug;
  version?: string;
  lastUpdated: number;
  icon: string;
  color: string;
}

export interface Guide extends GuideMeta {
  content: string;
  tips: GuideTip[];
  examples: PromptExample[];
  comparisons?: ModelComparison[];
}

export interface GuideTip {
  title: string;
  content: string;
  category: 'best-practice' | 'warning' | 'tip';
}

export interface PromptExample {
  title: string;
  description: string;
  prompt: string;
  expectedOutput?: string;
  model: ModelSlug;
}

export interface ModelComparison {
  modelA: ModelSlug;
  modelB: ModelSlug;
  criteria: {
    name: string;
    scoreA: number;
    scoreB: number;
  }[];
}
