set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."entries" (
	"entryId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"date" DATE NOT NULL,
	"location" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"milestone" BOOLEAN,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);
