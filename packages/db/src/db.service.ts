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
                    async deleteSoft<T>(
                        this: T,
                        { where }: { where: Prisma.Args<T, 'delete'>['where'] }
                    ): Promise<boolean> {
                        const context = Prisma.getExtensionContext(this);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const result = await (context as any).update({
                            where: { ...where, deleted_at: null },
                            data: {
                                deleted_at: new Date()
                            }
                        });
                        return result !== null;
                    }
                }
            },
            query: {
                async $allOperations({ args, query }) {
                    args.where = { deleted_at: null, ...args.where };
                    return query(args);
                }
            }
        });
    }
}
