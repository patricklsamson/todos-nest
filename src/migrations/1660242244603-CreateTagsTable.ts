import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTagsTable1660242244603 implements MigrationInterface {
    private tagsTable: Table = new Table({
        name: 'tags',
        columns: [
            {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar',
                length: '50',
                isNullable: false,
            },
            {
                name: 'todo_id',
                type: 'int',
                isNullable: false,
            },
            {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()',
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                isNullable: true,
            },
        ],
    });

    private todoForeignKey: TableForeignKey = new TableForeignKey({
        columnNames: ['todo_id'],
        referencedTableName: 'todos',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.tagsTable);

        await queryRunner.createForeignKey(
            this.tagsTable.name,
            this.todoForeignKey
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tagsTable);

        await queryRunner.dropForeignKey(
            this.tagsTable.name,
            this.todoForeignKey
        );
    }

}
