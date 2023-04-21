import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  padding: 10px;
`;
