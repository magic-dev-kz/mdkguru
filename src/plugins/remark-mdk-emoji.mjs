/**
 * Remark plugin: replaces emoji in text nodes with MDK.GURU SVG icons
 * Works at the remark (MDAST) level before conversion to HTML
 */
import { visit } from 'unist-util-visit';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const emojiMap = JSON.parse(readFileSync(join(__dirname, 'mdk_emoji_map.json'), 'utf8'));

const emojiKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
const emojiPattern = emojiKeys.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

export default function remarkMdkEmoji() {
  return (tree) => {
    const replacements = [];

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || index === undefined || !node.value) return;

      const regex = new RegExp(`(${emojiPattern})`, 'g');
      const parts = node.value.split(regex);
      if (parts.length <= 1) return;

      replacements.push({ index, parent, parts });
    });

    // Process in reverse order
    for (let i = replacements.length - 1; i >= 0; i--) {
      const { index, parent, parts } = replacements[i];
      const newChildren = [];
      for (const part of parts) {
        if (emojiMap[part]) {
          // Insert as raw HTML node in MDAST
          newChildren.push({ type: 'html', value: emojiMap[part] });
        } else if (part) {
          newChildren.push({ type: 'text', value: part });
        }
      }
      parent.children.splice(index, 1, ...newChildren);
    }
  };
}
