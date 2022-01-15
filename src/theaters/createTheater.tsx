import { TheaterForm } from ".";

export default function CreateTheater () {
    return (
        <>
        <h1>Create Theater</h1>
        <TheaterForm
          model={{name: ''}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}