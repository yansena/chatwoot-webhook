import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuOption } from './MenuOption';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  content!: string;

  @Column({ default: 'input_select' })
  type!: string;

  @OneToMany(() => MenuOption, option => option.menu, { cascade: true, eager: true })
  options!: MenuOption[];
}
