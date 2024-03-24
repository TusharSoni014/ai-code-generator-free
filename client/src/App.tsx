import { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import MdPreview from "./components/MdPreview";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  setCodeGenerationLoading,
  setGeneratedCode,
  updateGeneratedCode,
} from "./redux/slices/codeGeneration";
import { CodeXml, Loader, RotateCcw, StepForward, X } from "lucide-react";

function App() {
  const [prompt, setPrompt] = useState<string>("");
  const aiGeneratedCode = useAppSelector(
    (state) => state.codeGenerationSlice.generatedCode
  );
  const codeGenerationLoading = useAppSelector(
    (state) => state.codeGenerationSlice.loading
  );
  const dispatch = useAppDispatch();

  const handleGenerateCode = async () => {
    try {
      dispatch(setCodeGenerationLoading(true));
      const aiGeneratedCode = await axios.post(import.meta.env.VITE_BACKEND!, {
        prompt: prompt,
      });
      dispatch(setGeneratedCode(aiGeneratedCode.data.response));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setCodeGenerationLoading(false));
    }
  };

  const handleContinueGeneration = async () => {
    dispatch(setCodeGenerationLoading(true));
    try {
      const continuedCode = await axios.post(
        `${import.meta.env.VITE_BACKEND}/continue`,
        {
          prompt: prompt,
          content: aiGeneratedCode,
        }
      );
      dispatch(updateGeneratedCode(continuedCode.data.response));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setCodeGenerationLoading(false));
    }
  };

  return (
    <div className="w-full min-h-screen flex p-3 flex-col">
      <h1 className="text-4xl text-center w-full font-bold">
        AI Code Generator
      </h1>
      <div className="__input_prompt_container w-full flex flex-col p-3 justify-center items-center gap-3">
        <Textarea
          rows={5}
          className="w-[400px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Create a cat food website landing page using html, css, and javascript..."
        />
        {codeGenerationLoading ? (
          <>
            <Loader className="animate-spin" />
          </>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateCode}
              className="flex justify-center items-center gap-1"
            >
              {aiGeneratedCode ? (
                <>
                  Re-Generate Code <RotateCcw size={16} />
                </>
              ) : (
                <>
                  Generate Code <CodeXml size={16} />
                </>
              )}
            </Button>
            {aiGeneratedCode && (
              <Button
                variant="outline"
                className="flex justify-center items-center gap-1"
                onClick={handleContinueGeneration}
              >
                Continue Generation
                <StepForward size={16} />
              </Button>
            )}
            {aiGeneratedCode && (
              <Button
                variant="destructive"
                onClick={() => {
                  dispatch(setGeneratedCode(""));
                }}
              >
                Clean <X />
              </Button>
            )}
          </div>
        )}
      </div>
      {aiGeneratedCode && <MdPreview source={aiGeneratedCode} />}
    </div>
  );
}

export default App;
