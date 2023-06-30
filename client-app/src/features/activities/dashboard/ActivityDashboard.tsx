import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  onSelectActivity: (id: string) => void;
  onCancelSelectedActivity: () => void;
  editMode: boolean;
  onFormOpen: (id: string) => void;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: Activity) => void;
  onDeleteActivity: (id: string) => void;
};

export default function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectedActivity,
  editMode,
  onFormOpen,
  onFormClose,
  onCreateOrEditActivity,
  onDeleteActivity
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode ? (
          <ActivityDetails
            activity={selectedActivity}
            onCancelSelectedActivity={onCancelSelectedActivity}
            onFormOpen={onFormOpen}
          />
        ) : null}
        {editMode ? (
          <ActivityForm
            onFormClose={onFormClose}
            selectedActivity={selectedActivity}
            onCreateOrEditActivity={onCreateOrEditActivity}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
}
