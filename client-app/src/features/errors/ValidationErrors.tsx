import { Message } from "semantic-ui-react";

type Props = {
  errors: string[];
};

export default function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err: string, i: number) => (
            <Message.Item key={`error-${i}`}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
