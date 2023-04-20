import React, { ReactNode, forwardRef } from 'react';
import styled from 'styled-components';
import Col,{ColProps} from 'react-bootstrap/Col';

const CenteredView = styled.div<{ height: string; width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

interface ViewProps {
  children: ReactNode;
  style?: React.CSSProperties;
  height?: string;
  width?: string;
}

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, style, height = '100%', width = '100%' }, ref) => {
    return (
      <CenteredView style={style} height={height} width={width} ref={ref}>
        {children}
      </CenteredView>
    );
  }
);

export default View;



const CenteredViewCol = styled(Col)<{ height: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
`;

interface ViewColProps extends ColProps {
  children: ReactNode;
  style?: React.CSSProperties;
  height?: string;
}

const ViewCol = forwardRef<HTMLDivElement, ViewColProps>(
  ({ children, style, height = '100%', ...otherProps }, ref) => {
    return (
      <CenteredViewCol
        style={style}
        height={height}
        ref={ref}
        {...otherProps}
      >
        {children}
      </CenteredViewCol>
    );
  }
);

export { ViewCol, View};