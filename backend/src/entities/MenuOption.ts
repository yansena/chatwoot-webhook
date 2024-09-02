import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Menu } from './Menu';
import { MenuResponses } from './MenuResponses';

export enum MenuOtionValues {
  INPUT_EMAIL = "input_email",
  CARDS = "cards",
  INPUT_SELECT = "input_select",
  FORM = "form",
  ARTICLE = "article",
  STRING = "string"
}

@Entity()
export class MenuOption {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: "" })
  value!: string;

  @OneToOne(() => MenuResponses, menuResponse => menuResponse.menuOption, {
    cascade: true,
    eager: true
  })

  @JoinColumn()
  menuResponse!: MenuResponses;

  @ManyToOne(() => Menu, menu => menu.options, { onDelete: 'CASCADE' })
  menu!: Menu;
}
