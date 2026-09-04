# Doctor-Photo Placeholder Release Notes

## Scope

Every reusable **About the Dentist** section now contains a neutral doctor-photo placeholder by default. The placeholder is intentionally not a portrait and makes no claim about the clinician’s appearance. It provides a reserved visual location for an approved practice-supplied doctor photo to replace in a later release.

## Visibility behavior

The protected admin practice configuration now has an independent **Show doctor photo placeholder** control. The display rules are as follows.

| State | Public result |
|---|---|
| Profile and photo enabled | The placeholder appears beside the dentist’s name and credential details. |
| Photo disabled | The profile remains, without the placeholder. |
| Dentist profile disabled | The complete dentist-profile section is omitted. |
| Practice identity disabled | The complete dentist-profile section is omitted, including the placeholder. |

## Local validation

The isolated configuration fixture verified a photo-enabled Pantego Dental page, a photo-disabled PerioDDS page, a practice-identity-hidden Dental World page, and the preserved Dr. Lay legacy route. Each retained its assigned GoHighLevel survey. The photo toggle persisted correctly when switched off and then restored. Desktop browser inspection confirmed the profile used a 126 px placeholder column without horizontal overflow.

## Production validation

The release was committed as `3efe92d` and deployed successfully through the existing Railway web service. The live Pantego Dental Nighttime Breathing Sounds page confirms the neutral placeholder is present inside the visible dentist profile, has no portrait image source, and does not create horizontal overflow.
