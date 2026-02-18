import { Badge } from "@/components/ui/badge"
import { Skill } from "@/types"

interface SkillBadgeProps {
  skill: Skill
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="text-sm">
      {skill.name}
    </Badge>
  )
}
