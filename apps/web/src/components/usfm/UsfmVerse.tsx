import { ReactNode } from 'react';
import { Tooltip } from '@a-type/ui/components/tooltip';

export interface UsfmVerseProps {
  line: string;
}

export function UsfmVerse({ line }: UsfmVerseProps) {
  const withoutMarker = line.slice(3);
  // FIXME:
  let [verseNumber, ...rest] = withoutMarker.split(' ');
  let remaining = rest.join(' ');

  const words: ReactNode[] = [];
  while (remaining.length > 0) {
    // FIXME: check beginning for marker to make \f work too....
    const nextMarker = remaining.match(/\\(\w+)/);
    if (nextMarker) {
      const nextMarkerPosition = nextMarker.index || 0;
      if (nextMarkerPosition > 0) {
        words.push(
          <span key={words.length}>
            {remaining.slice(0, nextMarkerPosition)}
          </span>,
        );
        remaining = remaining.slice(nextMarkerPosition);
      } else {
        const nextMarkerName = nextMarker[1];
        const nextMarkerContent = remaining.match(
          new RegExp(`\\\\${nextMarkerName}(.*?)\\\\${nextMarkerName}\\\*`),
        );
        if (!nextMarkerContent) {
          throw new Error('No next marker content for ' + nextMarkerName);
        }
        const [whole, content] = nextMarkerContent;
        if (nextMarkerName.startsWith('f')) {
          // just "f" is a footnote
          // "f#" is a footnote with a number
          // "fe" is an endnote
          words.push(<UsfmFootnote key={words.length} content={content} />);
        } else if (nextMarkerName === 'w') {
          words.push(<UsfmWord key={words.length} word={content} />);
        } else {
          console.warn(`Unknown marker: ${nextMarkerName}`);
        }

        remaining = remaining.slice(remaining.indexOf(whole) + whole.length);
      }
    } else {
      words.push(<span key={words.length}>{remaining}</span>);
      remaining = '';
    }
  }

  return (
    <span>
      <span className="text-xs italic vertical-super">{verseNumber}</span>{' '}
      {words}
    </span>
  );
}

function UsfmWord({ word }: { word: string }) {
  const [display] = word.split('|');

  return <span className="word">{display}</span>;
}

function UsfmFootnote({ content }: { content: string }) {
  const textMatch = content.match(/\\ft(.*?)(\\?$)/);
  const text = textMatch?.[1]?.trim() || '';
  if (!text) return null;
  return (
    <Tooltip content={text} className="footnote">
      <span>*</span>
    </Tooltip>
  );
}
