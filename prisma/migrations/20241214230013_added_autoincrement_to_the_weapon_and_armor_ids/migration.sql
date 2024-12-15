-- AlterTable
CREATE SEQUENCE armor_id_seq;
ALTER TABLE "Armor" ALTER COLUMN "id" SET DEFAULT nextval('armor_id_seq');
ALTER SEQUENCE armor_id_seq OWNED BY "Armor"."id";

-- AlterTable
CREATE SEQUENCE weapon_id_seq;
ALTER TABLE "Weapon" ALTER COLUMN "id" SET DEFAULT nextval('weapon_id_seq');
ALTER SEQUENCE weapon_id_seq OWNED BY "Weapon"."id";
