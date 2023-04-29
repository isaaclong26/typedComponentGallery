// AnimatedRoute.tsx
import React, { ReactNode } from 'react';
import {RouteProps,  Route} from "react-router"
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

type Animation = {
  enter: string;
  enterActive: string;
  exit: string;
  exitActive: string;
};

type Preset = 'slide' | 'fade' | 'scale';

export type PageAniOptions = 'slide' | 'fade' | 'scale' | Animation

const animationPresets: Record<Preset, Animation> = {
  slide: {
    enter: 'slide-enter',
    enterActive: 'slide-enter-active',
    exit: 'slide-exit',
    exitActive: 'slide-exit-active',
  },
  fade: {
    enter: 'fade-enter',
    enterActive: 'fade-enter-active',
    exit: 'fade-exit',
    exitActive: 'fade-exit-active',
  },
  scale: {
    enter: 'scale-enter',
    enterActive: 'scale-enter-active',
    exit: 'scale-exit',
    exitActive: 'scale-exit-active',
  },
};


interface AnimatedRouteProps {
    path: string;
    animation?: Preset | Animation;
    timeout?: number;
    element: ReactNode;
  }
  
 

  export const AnimatedRoute: React.FC<AnimatedRouteProps> = ({
    element,
    animation = 'slide',
    timeout = 300,
    ...routeProps
  }) => {
    const animationClassNames =
      typeof animation === 'string'
        ? animationPresets[animation as Preset]
        : animation;
  
    const AnimatedElement = React.useMemo(
      () => (
        <CSSTransition
          in
          appear
          timeout={timeout}
          classNames={animationClassNames}
        >
          <AnimationWrapper>{element}</AnimationWrapper>
        </CSSTransition>
      ),
      [element, animationClassNames, timeout]
    );
  
    return <Route {...routeProps} element={AnimatedElement} />;
  };
  

const AnimationWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  &.slide-enter,
  &.slide-exit {
    transform: translateX(100%);
  }

  &.slide-enter-active {
    transform: translateX(0);
    transition: transform ${300}ms ease-in-out;
  }

  &.slide-exit-active {
    transform: translateX(-100%);
    transition: transform ${300}ms ease-in-out;
  }

  &.fade-enter,
  &.fade-exit {
    opacity: 0;
  }

  &.fade-enter-active,
  &.fade-exit-active {
    opacity: 1;
    transition: opacity ${300}ms ease-in-out;
  }

  &.scale-enter,
  &.scale-exit {
    transform: scale(0.9);
    opacity: 0;
  }

  &.scale-enter-active,
  &.scale-exit-active {
    transform: scale(1);
    opacity: 1;
    transition: transform ${300}ms ease-in-out, opacity ${300}ms ease-in-out;
  }
`;
