// SkeletonOrders.tsx
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`

const SkeletonWrapper = styled.div`
  padding: 8px 24px;
  background: transparent;
  border-radius: 8px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const SkeletonTitle = styled.div`
  width: 200px;
  height: 16px;
  border-radius: 4px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`

const FilterButton = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 6px;
  background: #e0e0e0;
  animation: ${shimmer} 1.5s infinite linear;
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background: white;
  margin-bottom: 12px;
  border-left: 4px solid #e0e0e0;
  padding: 16px;
  position: relative;
`

const ContentGroup = styled.div`
  flex-grow: 1;
`

const Line = styled.div`
  height: 14px;
  border-radius: 4px;
  background: #e0e0e0;
  animation: ${shimmer} 1.5s infinite linear;
  margin-bottom: 8px;
  width: ${({ width }: { width: string }) => width};
`

const StatusPill = styled.div`
  width: 140px;
  height: 24px;
  border-radius: 12px;
  background: #e0e0e0;
  animation: ${shimmer} 1.5s infinite linear;
`

const IconCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e0e0e0;
  animation: ${shimmer} 1.5s infinite linear;
  position: absolute;
  right: 16px;
  bottom: 16px;
`

export function SkeletonOrders() {
    return (
        <SkeletonWrapper>
            <Header>
                <SkeletonTitle />
                <FilterButton />
            </Header>

            {[1, 2, 3].map((_, idx) => (
                <Card key={idx}>
                    <ContentGroup>
                        <Line width="60%" />
                        <Line width="40%" />
                        <Line width="30%" />
                        <StatusPill />
                    </ContentGroup>
                    <IconCircle />
                </Card>
            ))}
        </SkeletonWrapper>
    )
}
