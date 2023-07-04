import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import { ChangeEvent, useState } from "react";

type Props = {
  selectedActivity: Activity | undefined;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
};

export default function ActivityForm({ selectedActivity, onFormClose, onCreateOrEditActivity, submitting }: Props) {
  const initialState: Activity = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    onCreateOrEditActivity(activity);
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setActivity({...activity, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleOnChange} />
        <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleOnChange} />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleOnChange} />
        <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleOnChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleOnChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleOnChange} />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={onFormClose}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
