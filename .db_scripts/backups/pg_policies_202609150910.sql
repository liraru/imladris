INSERT INTO pg_policies (schemaname,tablename,policyname,permissive,roles,cmd,qual,with_check) VALUES
	 ('public','yearly_readings','yearly_readings_delete','PERMISSIVE','{public}','DELETE','true',NULL),
	 ('public','yearly_readings','yearly_readings_insert','PERMISSIVE','{public}','INSERT',NULL,'true'),
	 ('public','yearly_readings','yearly_readings_select','PERMISSIVE','{public}','SELECT','true',NULL),
	 ('public','yearly_readings','yearly_readings_update','PERMISSIVE','{public}','UPDATE','true',NULL),
	 ('public','editorials','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','authors','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','book_series','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','book_authors','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','book_genres','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','mangas','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true');
INSERT INTO pg_policies (schemaname,tablename,policyname,permissive,roles,cmd,qual,with_check) VALUES
	 ('public','manga_genres','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','manga_authors','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','manga_volume_authors','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','books','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true'),
	 ('public','manga_volumes','allow_all_anon','PERMISSIVE','{anon,authenticated}','ALL','true','true');
