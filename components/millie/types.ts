import type { Reply, Tool } from '@/lib/millie-answers';
import type { Memory } from '@/lib/millie/memory';

export type Msg = {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  tool?: Tool;          // an interactive card (calculator, planner, quiz, menu, enquiry form)
  closed?: boolean;     // an older tool card, shown collapsed
  note?: string;        // extra context passed to an enquiry form (e.g. calculator summary)
  follow?: Reply[];     // suggested next steps under this message
};

// What every tool card can do in the chat.
export type ToolApi = {
  memory: Memory;
  remember: (patch: Partial<Memory>) => void;
  act: (reply: Reply, note?: string) => void;   // open a topic/tool, call, or open a link
  say: (text: string, follow?: Reply[]) => void; // Millie posts a message
};

export const TOOL_NAMES: Record<Tool, string> = {
  calc: '🧮 Cost calculator',
  party: '🎉 Party planner',
  quiz: '✨ Activity quiz',
  menu: '🍕 Menu',
  'enquiry-lane': '📝 Lane request',
  'enquiry-group': '📝 Group request',
};
