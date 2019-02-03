import React, { useEffect, useRef, useState } from 'react';

import styled from '../../styled-components';
import icons from '../../theme/icons';
import Subtitles from './Subtitles';
import Video from './Video';

const Container = styled.div`
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
    vertical-align: bottom;
    margin-right: 0.65rem;
    height: 22px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
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

interface ILinkProps {
  selected: boolean;
}

const Link = styled.a<ILinkProps>`
  ${(p: ILinkProps) =>
    p.selected &&
    `
    font-weight: bold;
  `}
`;

const items = [
  {
    component: <Video />,
    icon: icons.video,
    name: 'Video',
    anchor: '#video',
  },
  {
    component: <Subtitles />,
    icon: icons.subtitles,
    name: 'Tekstitykset',
    anchor: '#subtitles',
  },
];

export default function Settings() {
  const refs = items.map(() => useRef<HTMLDivElement>(null));
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const scrollListener = () => {
      const visibleRefs = refs
        .map((ref, key) => ({ ref, key }))
        .filter(({ ref }) => {
          if (!ref.current) {
            return false;
          }

          return (
            ref.current.offsetTop - window.outerHeight < window.pageYOffset
          );
        });

      const lastVisibleRef = visibleRefs.slice(-1)[0];

      if (currentTitle !== lastVisibleRef.key) {
        setCurrentTitle(lastVisibleRef.key);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  return (
    <Container>
      <Sidebar>
        {items.map((item, key) => (
          <Link
            selected={key === currentTitle}
            key={item.anchor}
            href={item.anchor}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </Sidebar>
      <Content>
        {items.map((item, key) => (
          <div key={item.anchor} ref={refs[key]}>
            {item.component}
          </div>
        ))}
      </Content>
    </Container>
  );
}
