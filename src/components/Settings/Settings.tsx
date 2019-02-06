import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from '../../styled';
import icons from '../../theme/icons';
import ProgressBar from './ProgressBar/ProgressBar';
import ProgressBarStore from './ProgressBar/store';
import Subtitles from './Subtitles/Subtitles';
import Video from './Video/Video';

const Container = styled.div`
  position: relative;
  display: flex;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem;
  background: #232323;
  width: 15rem;

  svg {
    fill: #787878;
    margin-right: 0.65rem;
    height: 22px;
  }

  a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
    margin: 1rem 0;

    &.active {
      font-weight: 600;
    }
  }
`;

const Content = styled.div`
  padding: 2rem;
  flex: 1;
  background: #1c1c1c;
`;

const Link = styled.a<{ selected: boolean }>`
  ${p =>
    p.selected &&
    `
    font-weight: bold;

    &::after {
      content: '';
      display: block;
      margin-left: auto;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid #1c1c1c;
      transform: translateX(2rem);
    }
  `}
`;

const Separator = styled.div`
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
`;

const items = [
  {
    component: <Video />,
    icon: icons.video,
    name: 'Video',
    anchor: 'video',
  },
  {
    component: <Subtitles />,
    icon: icons.subtitles,
    name: 'Tekstitykset',
    anchor: 'subtitles',
  },
  {
    component: <Subtitles />,
    icon: icons.color,
    name: 'Teema',
    anchor: 'theme',
  },
];

const Settings = observer(() => {
  const { progress } = useContext(ProgressBarStore);
  const refs = items.map(() => useRef<HTMLDivElement>(null));
  const [currentTitle, setCurrentTitle] = useState<number | null>(0);

  useEffect(() => {
    if (!refs[0].current) {
      return;
    }

    const initialPosition = refs[0].current.offsetTop - 50;
    const titlePositions = refs.map(
      ref => ref.current && ref.current.offsetTop
    );

    const scrollListener = () => {
      const selectedTitle = titlePositions.reduce((prev, curr, key) => {
        const isScrollUnderCurrentRef =
          (curr || 0) - initialPosition < window.pageYOffset;

        return isScrollUnderCurrentRef ? key : prev;
      }, 0);

      if (currentTitle !== selectedTitle && selectedTitle !== null) {
        setCurrentTitle(selectedTitle);
        const anchor = `#${items[selectedTitle].anchor}`;
        history.replaceState(undefined, 'setting change', anchor);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  const scrollSmoothly = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const titleId = e.currentTarget.getAttribute('href');
    const titleElement = titleId && document.querySelector(titleId);

    if (titleElement) {
      titleElement.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <ProgressBar progress={progress} />

      <Container>
        <Sidebar>
          {items.map((item, key) => (
            <Link
              selected={key === currentTitle}
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={scrollSmoothly}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </Sidebar>
        <Content>
          {items.map((item, key) => (
            <>
              {key > 0 && <Separator />}

              <div key={item.anchor} id={item.anchor} ref={refs[key]}>
                {item.component}
              </div>
            </>
          ))}
        </Content>
      </Container>
    </>
  );
});

export default Settings;
