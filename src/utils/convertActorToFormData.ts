import { Actor } from "../models";

export function convertActorToFormData(actor: Actor): FormData {
    var formData = new FormData();
    formData.append('name', actor.name);

    if(actor.biography) formData.append('biography', actor.biography);

    if(actor.dateOfBirth) formData.append('dateOfBirth', formatDate(actor.dateOfBirth));

    if(actor.picture) formData.append('picture', actor.picture);

    return formData;

}

function formatDate(date: Date){

    const format = Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: year},,
        {value: day}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}