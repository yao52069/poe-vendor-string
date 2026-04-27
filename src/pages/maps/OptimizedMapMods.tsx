import React, {useContext, useEffect, useState} from "react";
import {ProfileContext} from "../../components/profile/ProfileContext";
import {loadSettings, saveSettings} from "../../utils/LocalStorage";
import {HeaderWithLanguage} from "../../components/Header";
import SelectableTokenList from "../../components/SelectableTokenList/SelectableTokenList";
import {getGradientColor} from "../../utils/ColorGradient";
import {defaultSettings, MapSettings} from "../../utils/SavedSettings";
import {Checkbox} from "../vendor/Vendor";
import {generateMapModRegex} from "./OptimizedMapOutput";
import "./OptimizedMapMods.css";
import RegexResultBox from "../../components/RegexResultBox/RegexResultBox";
import {LanguageFiles} from "../../utils/Languages";
import {openTradeSearch, TradeSettings} from "../../utils/TradeUrlBuilder";

const OptimizedMapMods = () => {
  const {globalProfile} = useContext(ProfileContext);
  const profile = loadSettings(globalProfile);
  const [result, setResult] = useState("");
  const [selectedBadIds, setSelectedBadIds] = useState<number[]>(profile.map.badIds);
  const [selectedGoodIds, setSelectedGoodIds] = useState<number[]>(profile.map.goodIds);
  const [modGrouping, setModGrouping] = useState(profile.map.allGoodMods);
  const [quantity, setQuantity] = useState(profile.map.quantity);
  const [packsize, setPacksize] = useState(profile.map.packsize);
  const [itemRarity, setItemRarity] = useState(profile.map.itemRarity);
  const [optimizeQuant, setOptimizeQuant] = useState(profile.map.optimizeQuant);
  const [optimizePacksize, setOptimizePacksize] = useState(profile.map.optimizePacksize);
  const [optimizeQuality, setOptimizeQuality] = useState(profile.map.optimizeQuality);
  const [anyQuality, setAnyQuality] = useState(profile.map.anyQuality);
  const [rarity, setRarity] = useState(profile.map.rarity);
  const [corrupted, setCorrupted] = useState(profile.map.corrupted);
  const [unidentified, setUnidentified] = useState(profile.map.unidentified);
  const [quality, setQuality] = useState(profile.map.quality);
  const [regex, setRegex] = useState(LanguageFiles.mapmods[profile.language]);
  const [mapDropChance, setMapDropChance] = useState(profile.map.mapDropChance);
  const [displayNightmareMods, setDisplayNightmareMods] = useState(profile.map.displayNightmareMods);

  const [customTextStr, setCustomTextStr] = useState(profile.map.customText.value);
  const [enableCustomText, setEnableCustomText] = useState(profile.map.customText.enabled);
  const [tradeSearchLoading, setTradeSearchLoading] = useState(false);
  const [tradeMessage, setTradeMessage] = useState<string | null>(null);

  const handleTradeSearch = async () => {
    setTradeSearchLoading(true);
    setTradeMessage(null);
    try {
      const settings: TradeSettings = {
        badIds: selectedBadIds,
        goodIds: selectedGoodIds,
        allGoodMods: modGrouping,
        quantity,
        packsize,
        itemRarity,
        regex: result,
      };
      const tradeResult = await openTradeSearch(settings);
      if (tradeResult.success) {
        setTradeMessage("Trade search opened!");
      } else {
        setTradeMessage(`Trade site opened. ${tradeResult.error ? `(${tradeResult.error})` : ''}`);
      }
      setTimeout(() => setTradeMessage(null), 5000);
    } finally {
      setTradeSearchLoading(false);
    }
  };

  useEffect(() => {
    const settings: MapSettings = {
      badIds: selectedBadIds,
      goodIds: selectedGoodIds,
      allGoodMods: modGrouping,
      quantity,
      packsize,
      itemRarity,
      optimizeQuant,
      optimizePacksize,
      optimizeQuality,
      rarity,
      corrupted,
      unidentified,
      quality,
      anyQuality,
      displayNightmareMods,
      customText: {
        value: customTextStr,
        enabled: enableCustomText,
      },
      mapDropChance,
    };
    saveSettings({
      ...profile,
      map: {...settings},
    });
    setResult(generateMapModRegex(settings, regex, profile.language));
  }, [result, rarity, corrupted, unidentified, quality, anyQuality, itemRarity, selectedBadIds, selectedGoodIds, modGrouping, quantity, packsize, optimizeQuant, optimizePacksize, optimizeQuality, customTextStr, enableCustomText, regex, mapDropChance, displayNightmareMods]);

  return (
    <>
      <HeaderWithLanguage text={"优化地图词缀"}/>
      <RegexResultBox
        result={result}
        warning={undefined}
        enableBug={true}
        customText={customTextStr}
        setCustomText={setCustomTextStr}
        enableCustomText={enableCustomText}
        setEnableCustomText={setEnableCustomText}
        onTradeSearch={handleTradeSearch}
        tradeSearchLoading={tradeSearchLoading}
        reset={() => {
          setSelectedBadIds(defaultSettings.map.badIds);
          setSelectedGoodIds(defaultSettings.map.goodIds);
          setOptimizePacksize(defaultSettings.map.optimizePacksize);
          setOptimizeQuant(defaultSettings.map.optimizeQuant);
          setOptimizeQuality(defaultSettings.map.optimizeQuality);
          setModGrouping(defaultSettings.map.allGoodMods)
          setQuantity(defaultSettings.map.quantity);
          setPacksize(defaultSettings.map.packsize);
          setItemRarity(defaultSettings.map.itemRarity);
          setRarity(defaultSettings.map.rarity);
          setCorrupted(defaultSettings.map.corrupted);
          setUnidentified(defaultSettings.map.unidentified);
          setQuality(defaultSettings.map.quality);
          setEnableCustomText(defaultSettings.map.customText.enabled);
          setCustomTextStr(defaultSettings.map.customText.value);
          setMapDropChance(defaultSettings.map.mapDropChance);
          setDisplayNightmareMods(defaultSettings.map.displayNightmareMods);
        }}
      />
      {tradeMessage && (
        <div className="trade-message">
          {tradeMessage}
        </div>
      )}
      <div className="break"/>
      <p className="info-text">新版生成方式。如有 bug 请反馈，尤其是新添加的语言。<br/> 英文版已包含梦魇词缀，持续更新中。</p>
      <p className="trade-info-text">* 带星号字段与交易网站搜索兼容。</p>
      <div className="full-size generic-top-element">
        {/* ─── 卡片1：地图基础属性 ─── */}
        <div className="map-stat-card">
          <div className="map-stat-card-title">地图基础属性</div>
          <div className="map-stat-grid-2">
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="quantity">
                最低数量<span className="trade-compatible">*</span>
              </label>
              <input type="search" className="map-stat-input" id="quantity" name="search-mod"
                     value={quantity} onChange={v => setQuantity(v.target.value)}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="pack-size">
                最低怪物数量<span className="trade-compatible">*</span>
              </label>
              <input type="search" className="map-stat-input" id="pack-size" name="search-mod"
                     value={packsize} onChange={v => setPacksize(v.target.value)}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="mapdrop">更多地图 最低</label>
              <input type="search" className="map-stat-input" id="mapdrop" name="search-mod"
                     value={mapDropChance} onChange={v => setMapDropChance(v.target.value)}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="itemRarity">
                最低物品稀有度<span className="trade-compatible">*</span>
              </label>
              <input type="search" className="map-stat-input" id="itemRarity" name="search-mod"
                     value={itemRarity} onChange={v => setItemRarity(v.target.value)}/>
            </div>
          </div>
        </div>

        {/* ─── 卡片2：品质属性 ─── */}
        <div className="map-stat-card">
          <div className="map-stat-card-title">品质属性</div>
          <div className="map-stat-grid-3">
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qregular">品质</label>
              <input type="search" className="map-stat-input" id="qregular" name="search-mod"
                     value={quality.regular} onChange={v => setQuality({...quality, regular: v.target.value})}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qpacksize">品质（怪物数量）</label>
              <input type="search" className="map-stat-input" id="qpacksize" name="search-mod"
                     value={quality.packSize} onChange={v => setQuality({...quality, packSize: v.target.value})}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qrarity">品质（稀有度）</label>
              <input type="search" className="map-stat-input" id="qrarity" name="search-mod"
                     value={quality.rarity} onChange={v => setQuality({...quality, rarity: v.target.value})}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qcurrency">更多通货</label>
              <input type="search" className="map-stat-input" id="qcurrency" name="search-mod"
                     value={quality.currency} onChange={v => setQuality({...quality, currency: v.target.value})}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qdiv">品质（命运卡）</label>
              <input type="search" className="map-stat-input" id="qdiv" name="search-mod"
                     value={quality.divination} onChange={v => setQuality({...quality, divination: v.target.value})}/>
            </div>
            <div className="map-stat-item">
              <label className="map-stat-label" htmlFor="qscarab">更多圣甲虫</label>
              <input type="search" className="map-stat-input" id="qscarab" name="search-mod"
                     value={quality.scarab} onChange={v => setQuality({...quality, scarab: v.target.value})}/>
            </div>
          </div>
        </div>

        {/* ─── 卡片3：筛选选项 ─── */}
        <div className="map-stat-card">
          <div className="map-stat-card-title">筛选选项</div>

          <div className="map-options-row">
            <Checkbox label="匹配任意品质类型（禁用以匹配所有选中品质）" value={anyQuality} onChange={setAnyQuality}/>
            <Checkbox label="优化数量值（向下取整至最近10，大幅节省查询空间）" value={optimizeQuant} onChange={setOptimizeQuant}/>
            <Checkbox label="优化怪物数量值" value={optimizePacksize} onChange={setOptimizePacksize}/>
            <Checkbox label="优化地图品质值" value={optimizeQuality} onChange={setOptimizeQuality}/>
          </div>

          <div className="map-filter-row" style={{marginTop: '10px'}}>
            <Checkbox label="普通地图" value={rarity.normal} onChange={(e) => setRarity({...rarity, normal: !!e})}/>
            <Checkbox label="魔法地图" value={rarity.magic} onChange={(e) => setRarity({...rarity, magic: !!e})}/>
            <Checkbox label="稀有地图" value={rarity.rare} onChange={(e) => setRarity({...rarity, rare: !!e})}/>
            <div className="radio-button-modgroup">
              <input type="radio" className="radio-button-map" id="maps-include" name="map-include"
                     checked={rarity.include} onChange={v => setRarity({...rarity, include: true})}/>
              <label htmlFor="maps-include" className="radio-button-map radio-first-ele">包含</label>
              <input type="radio" id="maps-exclude" name="map-include"
                     checked={!rarity.include} onChange={v => setRarity({...rarity, include: false})}/>
              <label htmlFor="maps-exclude" className="radio-button-map">排除</label>
            </div>
          </div>

          <div className="map-filter-row">
            <Checkbox label="腐化地图" value={corrupted.enabled}
                      onChange={(e) => setCorrupted({...corrupted, enabled: !corrupted.enabled})}/>
            <div className="radio-button-modgroup">
              <input type="radio" className="radio-button-map" id="corrupted-include" name="corrupted-include"
                     checked={corrupted.include} onChange={v => setCorrupted({...corrupted, include: true})}/>
              <label htmlFor="corrupted-include" className="radio-button-map radio-first-ele">包含</label>
              <input type="radio" id="corrupted-exclude" name="corrupted-exclude"
                     checked={!corrupted.include} onChange={v => setCorrupted({...corrupted, include: false})}/>
              <label htmlFor="corrupted-exclude" className="radio-button-map">排除</label>
            </div>
          </div>

          <div className="map-filter-row">
            <Checkbox label="未鉴定地图" value={unidentified.enabled}
                      onChange={(e) => setUnidentified({...unidentified, enabled: !unidentified.enabled})}/>
            <div className="radio-button-modgroup">
              <input type="radio" className="radio-button-map" id="unidentified-include" name="unidentified-include"
                     checked={unidentified.include} onChange={v => setUnidentified({...unidentified, include: true})}/>
              <label htmlFor="unidentified-include" className="radio-button-map radio-first-ele">包含</label>
              <input type="radio" id="unidentified-exclude" name="unidentified-exclude"
                     checked={!unidentified.include} onChange={v => setUnidentified({...unidentified, include: false})}/>
              <label htmlFor="unidentified-exclude" className="radio-button-map">排除</label>
            </div>
          </div>

          <div className="map-filter-row">
            <Checkbox label="显示梦魇词缀" value={displayNightmareMods} onChange={setDisplayNightmareMods}/>
          </div>
        </div>
        <div className="break spacer-top"/>
      </div>

      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">不想要的词缀</div>
      </div>
      <div className="eq-col-2 box-small-padding">
        <div className="column-header map-column-text">想要的词缀</div>
        <div className="radio-button-modgroup">
          <input type="radio" className="radio-button-map" id="mods-any" name="mods" value="any"
                 checked={!modGrouping}
                 onChange={v => setModGrouping(!v.target.checked)}/>
          <label htmlFor="mods-any" className="radio-button-map radio-first-ele">匹配<b>任意</b>词缀</label>
          <input type="radio" id="mods-all" name="mods" value="all" checked={modGrouping}
                 onChange={v => setModGrouping(v.target.checked)}/>
          <label htmlFor="mods-all" className="radio-button-map">匹配<b>所有</b>词缀</label>
        </div>
      </div>
      <div className="break"/>
      <div className="eq-col-2">
        <SelectableTokenList
          sortFn={(a, b) => {
            return b.options.scary - a.options.scary
          }}
          colorFun={(isSelected, token) => {
            if (isSelected) return "#ffffff";
            if (token.options.scary < 100) return "#ffffff";
            if (token.options.scary > 1000) return "#eab7fc";
            return getGradientColor("#FC9090", "#ffffff", (1100 - token.options.scary) / 1100);
          }}
          elements={regex.tokens
            .filter((e) => displayNightmareMods ? true : !e.options.nm)
          }
          setSelected={setSelectedBadIds}
          selected={selectedBadIds}
        />
      </div>
      <div className="eq-col-2">
        <SelectableTokenList
          sortFn={(a, b) => {
            return a.options.scary - b.options.scary
          }}
          colorFun={(isSelected, token) => {
            if (isSelected) return "#ffffff";
            if (token.options.scary < 100) return "#ffffff";
            if (token.options.scary > 1000) return "#eab7fc";
            return getGradientColor("#FC9090", "#ffffff", (1100 - token.options.scary) / 1100);
          }}
          elements={regex.tokens
            .filter((e) => displayNightmareMods ? true : !e.options.nm)
          }
          setSelected={setSelectedGoodIds}
          selected={selectedGoodIds}
        />
      </div>
    </>
  )
}


export default OptimizedMapMods;