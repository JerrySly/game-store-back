CREATE TABLE Users (
    id bigserial primary key,
    email text not null,
    password text not null,
    emailConfimed boolean default false
);

CREATE TABLE Roles (
    id bigserial primary key,
    name text not null
);

CREATE TABLE UserRoles (
    id bigserial primary key,
    userId bigserial references Users (id),
    roleId bigserial references Roles (id)
);

CREATE TABLE Tokens (
    userId bigserial references Users (id),
    token text not null
);

CREATE TABLE Games (
    id bigserial primary key,
    name text not null,
    tags integer[],
    description text,
    price integer not null,
    releaseDate date,
    smallPicture text,
    bigPicture text
);