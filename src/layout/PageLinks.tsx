import './PageLinks.css';
import vendorIcon from '../img/linkicons/fusing.png';
import mapIcon from '../img/linkicons/crimson_temple_map.png';
import alterationIcon from '../img/linkicons/alteration.png';
import mapNameIcon from '../img/linkicons/chateau_map.png';
import flaskIcon from '../img/linkicons/glassblower.png';
import heistIcon from '../img/linkicons/blueprint.png';
import expeditionIcon from '../img/linkicons/expeidition_reroll.png';
import jewelIcon from '../img/linkicons/cobalt.png';
import beastIcon from '../img/BestiaryOrbFull.png';
import scarabIcon from '../img/scarab.png';
import tattooIcon from '../img/tattoo.png';
import runegraftIcon from '../img/runegraft.png';
import coffeeIcon from '../img/bmc-logo-no-background.png';
import githubIcon from '../img/github-mark-white.png';
import plausibleIcon from '../img/plausible_logo_sm.png';
import { Link, useLocation } from 'react-router-dom';


export interface PageLinkProps {
  text: string
  icon: string
  route: string
  currentPage: string
}

export const PageLink = (props: PageLinkProps) => {
  const { text, icon, route, currentPage } = props;
  const classes = route === currentPage ? "page-link page-link-current" : "page-link";
  return (
    <div className={classes}>
      <Link to={route}>
        <img alt={text + "-icon"} className="page-link-icon" src={icon} />
        {text}
      </Link>
    </div>
  );
}

const PageLinks = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (<div className="page-link-wrapper">
    <div className="page-link-header">流亡正则</div>
    <div className="page-links">
      <p className="poe2-link">
        <a className="source-link" href="https://poe2.re" rel="noreferrer">
          流亡编年史2 正则
        </a>
      </p>
      <PageLink text="商人" icon={vendorIcon} route={"/"} currentPage={currentPage} />
      <PageLink text="地图词缀" icon={mapIcon} route={"/maps"} currentPage={currentPage} />
      <PageLink text="物品" icon={alterationIcon} route={"/items"} currentPage={currentPage} />
      <PageLink text="地图名称" icon={mapNameIcon} route={"/mapnames"} currentPage={currentPage} />
      <PageLink text="探险队" icon={expeditionIcon} route={"/expedition"} currentPage={currentPage} />
      <PageLink text="盗贼港" icon={heistIcon} route={"/heist"} currentPage={currentPage} />
      <PageLink text="药剂" icon={flaskIcon} route={"/flasks"} currentPage={currentPage} />
      <PageLink text="异兽图鉴" icon={beastIcon} route={"/beast"} currentPage={currentPage} />
      <PageLink text="纹身" icon={tattooIcon} route={"/tattoo"} currentPage={currentPage} />
      <PageLink text="符文嫁接" icon={runegraftIcon} route={"/runegraft"} currentPage={currentPage} />
      <PageLink text="圣甲虫" icon={scarabIcon} route={"/scarab"} currentPage={currentPage} />
      <PageLink text="珠宝" icon={jewelIcon} route={"/jewel"} currentPage={currentPage} />
      <p></p>
      <p className="support-link">
        <img src={githubIcon} alt="issue tracker" className="support-icon" />
        <a className="source-link" href="https://github.com/veiset/poe-vendor-string/issues"
          rel="noreferrer">
          报告问题
        </a>
      </p>
      <p className="support-link">
        <img src={coffeeIcon} alt="buy me a coffee" className="support-icon" />
        <a className="source-link" href="https://www.buymeacoffee.com/veiset" rel="noreferrer">
          打赏作者</a>
      </p>
      <p className="support-link">
        <img src={plausibleIcon} alt="website stats" className="support-icon" />
        <a className="source-link" href="https://p.vz.is/poe.re" rel="noreferrer">
          网站统计</a>
      </p>
    </div>
  </div>)
}


export default PageLinks;
