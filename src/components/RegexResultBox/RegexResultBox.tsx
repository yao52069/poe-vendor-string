import "./RegexResultBox.css";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Checkbox} from "../../pages/vendor/Vendor";
import {BugReport} from "../bugreport/BugReport";

export interface RegexResultBoxProps {
  result: string
  reset: () => any
  customText: string
  setCustomText: Dispatch<SetStateAction<string>>
  enableCustomText: boolean
  setEnableCustomText: Dispatch<SetStateAction<boolean>>
  warning?: string
  error?: string
  maxLength?: number
  enableBug?: boolean
  onTradeSearch?: () => void
  tradeSearchLoading?: boolean
}

const RegexResultBox = (props: RegexResultBoxProps) => {
  const {
    result,
    warning,
    error,
    reset,
    customText,
    setCustomText,
    enableCustomText,
    setEnableCustomText,
    maxLength,
    enableBug,
    onTradeSearch,
    tradeSearchLoading,
  } = props;

  const maxLen = maxLength ?? 250;
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = React.useState<string | undefined>(undefined);
  const [autoCopy, setAutoCopy] = React.useState(false);
  const bugButton = enableBug ?? false;

  const finalResult = (customText.length > 0 && enableCustomText)
    ? `${result} ${customText}`
    : result;

  useEffect(() => {
    if (autoCopy) {
      navigator.clipboard.writeText(result);
      setCopied(result);
    }
  }, [result, autoCopy]);

  return (
    <div className="rrb-layout">
      <div className="rrb-result">
        <div className={finalResult === copied ? "rrb-result-text copied-good" : "rrb-result-text"}>
          {finalResult}
        </div>
        {error && <div className="error">错误: {error}</div>}
        {warning && <div className="warning">{warning}</div>}
        {finalResult.length > maxLen &&
            <div className="error">错误: 已使用 {finalResult.length} / {maxLen} 字符 - PoE 客户端最大限制 {maxLen} 字符
            </div>
        }
        {finalResult.length <= maxLen &&
            <div className="rrb-result-info">
                长度: {finalResult.length} / {maxLen}
            </div>
        }
      </div>
      <div className="rrb-actions">
        <button className="rrb-copy-button" onClick={() => {
          setCopied(finalResult);
          navigator.clipboard.writeText(finalResult);
        }}>
          复制
        </button>
        <button className="rrb-reset-button" onClick={() => {
          reset();
        }}>
          重置
        </button>
        {onTradeSearch && (
          <button
            className="rrb-trade-button"
            onClick={onTradeSearch}
            disabled={tradeSearchLoading}
          >
            {tradeSearchLoading ? "加载中..." : "交易"}
          </button>
        )}
        <button className="rrb-option-button" onClick={() => {
          setShowOptions(!showOptions)
        }}>
          选项
        </button>
        {bugButton && <button className="rrb-bug">
            <BugReport regex={result} />
        </button> }
      </div>
      {showOptions && <div className="rrb-options">
          <Checkbox label={"启用自定义文本"} value={enableCustomText} onChange={setEnableCustomText}/>
          <div className="rrb-options-custom-text">
              <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)}/>
          </div>
          <Checkbox label={"自动复制结果"} value={autoCopy} onChange={setAutoCopy}/>
      </div>
      }
    </div>
  )

}

export interface AutoCopyCheckboxProps {
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

export const AutoCopyCheckbox = (props: AutoCopyCheckboxProps) => {
  return (
    <label className="auto-copy">
      <input type="checkbox" className="checkbox-autocopy" checked={props.value}
             onChange={e => props.onChange(e.target.checked)}/>
      <span className="auto-copy-text">自动复制</span>
    </label>
  )
}

export default RegexResultBox;
