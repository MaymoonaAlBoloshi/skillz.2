/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	ContentBlock = "content_block",
	Domain = "domain",
	Lesson = "lesson",
	Mentee = "mentee",
	Roles = "roles",
	Skill = "skill",
	SkillLevel = "skill_level",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum ContentBlockTypeOptions {
	"text" = "text",
	"image" = "image",
	"video" = "video",
	"code" = "code",
}
export type ContentBlockRecord = {
	code?: string
	content_md?: string
	lesson?: RecordIdString
	order: number
	recource?: string
	type?: ContentBlockTypeOptions
}

export type DomainRecord = {
	desc?: string
	name: string
	thumbnail?: string
}

export type LessonRecord = {
	desc?: string
	skill_level?: RecordIdString[]
	title: string
}

export type MenteeRecord = {
	avatar?: string
	name?: string
}

export type RolesRecord = {
	desc?: string
	name: string
}

export type SkillRecord = {
	desc?: string
	domains?: RecordIdString[]
	name: string
	thumbnail?: string
}

export type SkillLevelRecord = {
	desc?: string
	domain?: RecordIdString
	name: string
	skills?: RecordIdString[]
}

export enum UsersProficiencyOptions {
	"E1" = "1",
	"E2" = "2",
	"E3" = "3",
	"E4" = "4",
	"E5" = "5",
}
export type UsersRecord = {
	avatar?: string
	bio?: string
	domains: RecordIdString[]
	name: string
	proficiency?: UsersProficiencyOptions
	role: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type ContentBlockResponse<Texpand = unknown> = Required<ContentBlockRecord> & BaseSystemFields<Texpand>
export type DomainResponse<Texpand = unknown> = Required<DomainRecord> & BaseSystemFields<Texpand>
export type LessonResponse<Texpand = unknown> = Required<LessonRecord> & BaseSystemFields<Texpand>
export type MenteeResponse<Texpand = unknown> = Required<MenteeRecord> & AuthSystemFields<Texpand>
export type RolesResponse<Texpand = unknown> = Required<RolesRecord> & BaseSystemFields<Texpand>
export type SkillResponse<Texpand = unknown> = Required<SkillRecord> & BaseSystemFields<Texpand>
export type SkillLevelResponse<Texpand = unknown> = Required<SkillLevelRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	content_block: ContentBlockRecord
	domain: DomainRecord
	lesson: LessonRecord
	mentee: MenteeRecord
	roles: RolesRecord
	skill: SkillRecord
	skill_level: SkillLevelRecord
	users: UsersRecord
}

export type CollectionResponses = {
	content_block: ContentBlockResponse
	domain: DomainResponse
	lesson: LessonResponse
	mentee: MenteeResponse
	roles: RolesResponse
	skill: SkillResponse
	skill_level: SkillLevelResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'content_block'): RecordService<ContentBlockResponse>
	collection(idOrName: 'domain'): RecordService<DomainResponse>
	collection(idOrName: 'lesson'): RecordService<LessonResponse>
	collection(idOrName: 'mentee'): RecordService<MenteeResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'skill'): RecordService<SkillResponse>
	collection(idOrName: 'skill_level'): RecordService<SkillLevelResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
