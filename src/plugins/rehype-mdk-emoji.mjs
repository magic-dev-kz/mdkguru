/**
 * Rehype plugin: replaces emoji in text nodes with MDK.GURU SVG icons
 * Uses mdk_emoji_map.json from Leo's icon pack
 */
import { visit } from 'unist-util-visit';
import { fromHtml } from 'hast-util-from-html';
import emojiMap from './mdk_emoji_map.json' with { type: 'json' };

// Build regex from all emoji keys
const emojiKeys = Object.keys(emojiMap);
const emojiRegex = new RegExp(`(${emojiKeys.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

export default function rehypeMdkEmoji() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !node.value || !emojiRegex.test(node.value)) return;

      // Reset regex
      emojiRegex.lastIndex = 0;

      const parts = node.value.split(emojiRegex);
      if (parts.length <= 1) return;

      const newChildren = [];
      for (const part of parts) {
        if (emojiMap[part]) {
          // Replace emoji with SVG
          const svgTree = fromHtml(emojiMap[part], { fragment: true });
          newChildren.push(...svgTree.children);
        } else if (part) {
          newChildren.push({ type: 'text', value: part });
        }
      }

      parent.children.splice(index, 1, ...newChildren);
      return index + newChildren.length;
    });
  };
}
