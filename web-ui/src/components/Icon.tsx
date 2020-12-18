import React, { SVGProps } from 'react';
import styled from 'styled-components';

import { color as clr } from 'theme';
import { ICONS, ICONS_LIGHT, ICONS_BOLD } from 'types/icon';
import { COLOR_NAME } from 'types/theme';

import { ReactComponent as Add } from 'assets/icons/regular/add.svg';
import { ReactComponent as AddBold } from 'assets/icons/bold/add.svg';
import { ReactComponent as Alert } from 'assets/icons/regular/alert-triangle.svg';
import { ReactComponent as ArrowLeft } from 'assets/icons/regular/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/bold/arrow-thick-right-2.svg';
import { ReactComponent as BarGraphLight } from 'assets/icons/light/bar-graph.svg';
import { ReactComponent as Bin } from 'assets/icons/regular/bin-1.svg';
import { ReactComponent as ButtonRecordLight } from 'assets/icons/light/button-record.svg';
import { ReactComponent as Camera } from 'assets/icons/regular/camera-1.svg';
import { ReactComponent as Check } from 'assets/icons/regular/check-1.svg';
import { ReactComponent as CheckBold } from 'assets/icons/bold/check-1.svg';
import { ReactComponent as ChevronUp } from 'assets/icons/regular/arrow-up-1.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/regular/arrow-down-1.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/regular/arrow-left-1.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/regular/arrow-right-1.svg';
import { ReactComponent as ChristmasBells } from 'assets/icons/regular/christmas-bells.svg';
import { ReactComponent as ChristmasBellsLight } from 'assets/icons/light/christmas-bells.svg';
import { ReactComponent as Close } from 'assets/icons/regular/close.svg';
import { ReactComponent as Download } from 'assets/icons/light/common-file-download.svg';
import { ReactComponent as Edit } from 'assets/icons/regular/pencil.svg';
import { ReactComponent as FullscreenEnter } from 'assets/icons/regular/expand-3.svg';
import { ReactComponent as FullscreenExit } from 'assets/icons/regular/shrink-2.svg';
import { ReactComponent as Graph } from 'assets/icons/regular/analytics-graph-lines.svg';
import { ReactComponent as GroupUsersLight } from 'assets/icons/light/group-users.svg';
import { ReactComponent as HamburgerMenu } from 'assets/icons/regular/navigation-menu.svg';
import { ReactComponent as HouseEntranceLight } from 'assets/icons/light/house-entrance.svg';
import { ReactComponent as Info } from 'assets/icons/regular/information-circle.svg';
import { ReactComponent as Learn } from 'assets/icons/regular/read-human.svg';
import { ReactComponent as LearnLight } from 'assets/icons/light/read-human.svg';
import { ReactComponent as Logout } from 'assets/icons/regular/logout-1.svg';
import { ReactComponent as Moments } from 'assets/icons/regular/server-clock.svg';
import { ReactComponent as PaperPlane } from 'assets/icons/regular/send-email.svg';
import { ReactComponent as Photo } from 'assets/icons/regular/picture-polaroid-human.svg';
import { ReactComponent as Play } from 'assets/icons/regular/controls-play.svg';
import { ReactComponent as PlayBold } from 'assets/icons/bold/controls-play.svg';
import { ReactComponent as PositiveCVLight } from 'assets/icons/light/dating-search.svg';
import { ReactComponent as SeeTheGood } from 'assets/icons/regular/mood-happy.svg';
import { ReactComponent as Share } from 'assets/icons/regular/share-2.svg';
import { ReactComponent as SeeTheGoodLight } from 'assets/icons/light/mood-happy.svg';
import { ReactComponent as Teach } from 'assets/icons/regular/school-teacher.svg';
import { ReactComponent as TeachLight } from 'assets/icons/light/school-teacher.svg';
import { ReactComponent as HandExpandLight } from 'assets/icons/light/hand-expand.svg';
import { ReactComponent as CalendarHeartLight } from 'assets/icons/light/calendar-heart.svg';
import { ReactComponent as LaptopSmileyLight } from 'assets/icons/light/laptop-smiley.svg';
import { ReactComponent as BookPagesLight } from 'assets/icons/light/book-pages.svg';

interface BasicProps {
  alt?: string;
  large?: boolean;
  size?: string;
  width?: string;
  height?: string;
  color?: COLOR_NAME;
  [x: string]: any;
}

interface RegularProps extends BasicProps {
  light?: never;
  bold?: never;
  name: ICONS;
}

interface LightProps extends BasicProps {
  light: boolean;
  name: ICONS_LIGHT;
  bold?: never;
}

interface BoldProps extends BasicProps {
  bold: boolean;
  name: ICONS_BOLD;
  light?: never;
}

type Props = RegularProps | LightProps | BoldProps;

const componentsRegular: { [x: string]: React.FC<SVGProps<SVGSVGElement>> } = {
  add: Add,
  alert: Alert,
  arrowLeft: ArrowLeft,
  bin: Bin,
  camera: Camera,
  check: Check,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  christmasBells: ChristmasBells,
  close: Close,
  edit: Edit,
  fullscreenEnter: FullscreenEnter,
  fullscreenExit: FullscreenExit,
  graph: Graph,
  hamburgerMenu: HamburgerMenu,
  info: Info,
  learn: Learn,
  logout: Logout,
  moments: Moments,
  paperPlane: PaperPlane,
  photo: Photo,
  play: Play,
  seeTheGood: SeeTheGood,
  share: Share,
  teach: Teach,
};

const componentsLight: { [x: string]: React.FC<SVGProps<SVGSVGElement>> } = {
  barGraph: BarGraphLight,
  bookPages: BookPagesLight,
  buttonRecord: ButtonRecordLight,
  calendarHeart: CalendarHeartLight,
  christmasBells: ChristmasBellsLight,
  download: Download,
  groupUsers: GroupUsersLight,
  handExpand: HandExpandLight,
  houseEntrance: HouseEntranceLight,
  laptopSmiley: LaptopSmileyLight,
  learn: LearnLight,
  seeTheGood: SeeTheGoodLight,
  positiveCV: PositiveCVLight,
  teach: TeachLight,
};

const componentsBold: { [x: string]: React.FC<SVGProps<SVGSVGElement>> } = {
  add: AddBold,
  check: CheckBold,
  arrowRight: ArrowRight,
  play: PlayBold,
};

const Icon: React.FC<Props> = ({
  alt,
  name,
  light = false,
  bold = false,
  large = false,
  size = large ? '86px' : '20px',
  width = size,
  height = size,
  color = 'black',
  ...props
}) => {
  type ISVGProps = SVGProps<SVGSVGElement> & {
    title?: string;
  };
  const IconComponent: React.FC<ISVGProps> = light
    ? componentsLight[name]
    : bold
    ? componentsBold[name]
    : componentsRegular[name];

  return (
    <StyledSpan color={color} width={width} height={height} {...props}>
      <IconComponent title={alt} role="img" />
    </StyledSpan>
  );
};

const StyledSpan = styled.span<Props>`
  color: ${({ color }) => clr(color)};
  font-size: 0;
  line-height: 0;
  transition: color 0.3s ease;

  svg {
    color: currentColor;
    display: inline-block;
    height: ${({ height, width }) => height || width};
    transition: color 0.3s ease;
    width: ${({ width }) => width};
  }
`;

export default Icon;
