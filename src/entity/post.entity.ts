import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;
}

export default Post;
