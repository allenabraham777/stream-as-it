import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
export type PrismaService = ReturnType<BasePrismaService['withExtensions']>;

@Injectable()
export class BasePrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    withExtensions() {
        return this.$extends({
            model: {
                $allModels: {
                    async deleteSoft<T, U>(
                        this: T,
                        { where }: { where: Prisma.Args<T, 'delete'>['where'] }
                    ): Promise<Prisma.Result<T, U, 'update'>> {
                        const context = Prisma.getExtensionContext(this);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return await (context as any).update({
                            where: { ...where, deleted_at: null },
                            data: {
                                deleted_at: new Date()
                            }
                        });
                    },
                    async deleteManySoft<T, U>(
                        this: T,
                        { where }: { where: Prisma.Args<T, 'deleteMany'>['where'] }
                    ): Promise<Prisma.Result<T, U, 'updateMany'>> {
                        const context = Prisma.getExtensionContext(this);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return await (context as any).updateMany({
                            where: { ...where, deleted_at: null },
                            data: {
                                deleted_at: new Date()
                            }
                        });
                    }
                }
            },
            query: {
                async $allOperations({ operation, args, query }) {
                    if (operation !== 'create') {
                        args.where = { deleted_at: null, ...args.where };
                    }
                    return query(args);
                }
            }
        });
    }
}
