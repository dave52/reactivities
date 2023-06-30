import { Button, Container, Menu } from "semantic-ui-react";

type Props = {
  onOpenForm: () => void;
}

export default function NavBar({ onOpenForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item header>
          <Button onClick={onOpenForm}positive content="Create activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
