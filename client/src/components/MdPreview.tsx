import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MdPreview({ source }: { source: string }) {
  return (
    <MarkdownPreview
      source={source}
      className=" p-3 rounded-lg"
    />
  );
}
