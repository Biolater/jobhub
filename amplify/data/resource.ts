import { ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.string().required(),
      bio: a.string().default("No bio yet"),
      profilePic: a.string().required(),
      profileBanner: a.string(),
      portfolioUrl: a.url(),
      location: a.string(),
      jobs: a.hasMany("Job", "userId"),
      savedJobs: a.hasMany("SavedJob", "userId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["create"]),
      allow.authenticated(),
    ]),
  Job: a
    .model({
      userId: a.id(),
      title: a.string().required(),
      joburl: a.string().required(),
      company: a.string().required(),
      status: a.enum(["Saved", "Applied", "Interviewing", "Hired", "Rejected"]),
      description: a.string().required(),
      date: a.string().required(),
      notes: a.string(),
      jobId: a.string().required(),
      user: a.belongsTo("User", "userId"),
      isSaved: a.boolean().default(false),
    }).secondaryIndexes((index) => [index('jobId')])
    .authorization((allow) => [allow.authenticated()]),
  SavedJob: a
    .model({
      userId: a.id(),
      user: a.belongsTo("User", "userId"),
      jobId: a.id().required(),
    })
    .authorization((allow) => [allow.authenticated()])
    .identifier(["jobId"]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
