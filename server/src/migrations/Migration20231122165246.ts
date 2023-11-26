import { Migration } from '@mikro-orm/migrations';

export class Migration20231122165246 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "items" ("id" serial primary key, "name" varchar(255) not null, "price" int not null, "quantity" int not null, "image" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null);');
    this.addSql('create table "users" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "balance" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "items" cascade;');
    this.addSql('drop table if exists "users" cascade;');
  }

}
