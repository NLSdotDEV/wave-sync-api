import {
  DeepPartial,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(private readonly repo: Repository<T>) {}

  async findAll(
    perPage: number = 15,
    page: number = 1,
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ) {
    const { take, skip } = this.paginate(perPage, page);
    return await this.repo.findAndCount({
      skip,
      take,
      where: options,
    });
  }

  async findById(id: string) {
    return await this.repo.findOneBy({ id } as any);
  }

  async create(data: DeepPartial<T>) {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async update(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    data: DeepPartial<T>,
  ) {
    const updated = await this.repo.update(options, data as any);
    return updated.affected;
  }

  async delete(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]){
    const deleted = await this.repo.delete(options);
    return deleted.affected;
  }

  protected paginate(perPage: number, page: number) {
    const limit = perPage < 15 || perPage > 100 ? 15 : perPage;
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }
}
