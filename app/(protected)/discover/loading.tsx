import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DiscoverPageLoading() {
  return (
    <ul className="relative mx-auto my-8 h-full w-[320px]">
      <li className="h-full w-full">
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-[2/3] rounded-xl">
              <Skeleton className="h-full w-full" />
              <div className="absolute bottom-0 flex w-full flex-col gap-3 rounded-bl-xl rounded-br-xl bg-gradient-to-t from-black to-transparent/80 p-3">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="-4 h-4 w-[60px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </li>
    </ul>
  );
}
