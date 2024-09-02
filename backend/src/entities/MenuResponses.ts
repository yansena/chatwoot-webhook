import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { MenuOption, MenuOtionValues } from './MenuOption';

@Entity()
export class MenuResponses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  responseType!: string;

  @Column({
    type: 'jsonb',
    default: { items: {} }
  })
  content!: any;

  @Column()
  value!: string;  // Este campo armazenará o valor correspondente da MenuOption

  @OneToOne(() => MenuOption, menuOption => menuOption.menuResponse, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menuOptionId' })
  menuOption!: MenuOption;
}
