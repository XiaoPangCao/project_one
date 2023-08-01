import { Permission } from './permission.entity'
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation'
  })
  permissions: Permission[]
}