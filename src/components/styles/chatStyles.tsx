import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  marginTop:20px;
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MessageSender = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const MessageContent = styled.span``;

export const InputContainer = styled.div`
postiton:absolute;
bottom: 10px;
  padding: 10px;
`;
interface StyledHoleProps {
  targetTop: number;
  targetBottom: number;
}


export const StyledHole = styled.div<StyledHoleProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: white;
    mix-blend-mode: exclusion;
  }

  &::before {
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.targetTop}px;
  }

  &::after {
    left: 0;
    bottom: 0;
    right: 0;
    height: ${props => props.targetBottom}px;
  }
`;

export const userMessageStyle: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  alignSelf: "flex-end",
  borderRadius: "10px 0px 10px 10px",
  padding: "10px",
  marginBottom: "8px",
};

export const otherMessageStyle: React.CSSProperties = {
  backgroundColor: "#e6e6e6",
  color: "#000000",
  alignSelf: "flex-start",
  borderRadius: "0px 10px 10px 10px",
  padding: "10px",
  marginBottom: "8px",
};
