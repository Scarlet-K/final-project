set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."entries" (
	"entryId" serial NOT NULL,
	"imageUrl" TEXT,
	"date" DATE NOT NULL,
	"address" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"milestone" BOOLEAN,
	"placeName" TEXT NOT NULL,
	"latLng" json NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);
