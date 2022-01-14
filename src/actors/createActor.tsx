import { ActorForm } from ".";

export default function CreateActor () {
    return (
        <>
        <h1>Create Actor</h1>
        <ActorForm
          model={{name: '', dateOfBirth: undefined}}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 3000));
            console.log(values);
        }}
          />
        </>
    );
}